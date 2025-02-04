import { Request, Response } from 'express'; // These reperesnt the incoming HTTP requests and outgoing HTTP responses
import { UserService } from '../services/userService'; // handles creating a ndew user and other user related ops
import { StylePreference } from '../models/StylePreference';
import { User } from '../models/User';
import { StylePreferenceService } from '../services/stylePreferenceService';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

export class UserController {
    private userService: UserService;
    private stylePreferenceService: StylePreferenceService;

    constructor() {
        this.userService = new UserService();
        this.stylePreferenceService = new StylePreferenceService();
    }

    // Creating New Account for user
    async register(req: Request, res: Response): Promise<any> {
        try {
            console.log('Register request received:', req.body); 
            const { email, password, firstName, lastName } = req.body;

            // Validat einput
            if (!email || !password || !firstName || !lastName){
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            // Create a user using user data (req.body) from the HTTP request
            // Create a user
            const user = await this.userService.createUser({
                email,
                password,
                firstName,
                lastName,
                stylePreferenceId: uuidv4(),  // Set default to null or create an initial one
            });
            
            // 201 means "Created" so user was created successfully (request was successful)
            return res.status(201).json({
                success: true,
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    stylePreferenceId: user.stylePreferenceId, 
                },
                message: 'User registered successfully',

            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            // 400 means bad request and sends a json response back to client
            return res.status(400).json({
                success: false,
                message: 'Registration failed',
                error: errorMessage
            });
        }
    }

    // User Logging in
    async login(req: Request, res: Response): Promise<any> {
        try {
            const {email, password} = req.body;

            // Validat input
            if(!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and/or password are required. Please check if they are entered correctly.'
                });
            }
            const {user, token} = await this.userService.loginUser(email, password);
            
            // Log user and stylePreferenceId for debugging
            console.log('User logged in:', user);
            console.log('User Style Preference ID:', user.stylePreferenceId);
            
            return res.status(200).json({
                success: true,
                message: 'Login Successful',
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        stylePreferenceId: user.stylePreferenceId, 
                    }
                }
            });
        } catch (error: any) {
            console.error('Error during login:', error.message);
            return res.status(401).json({
                success: false,
                message: 'Login failed',
                error: error.message
            });

        }
    }

    async getProfile(req: Request, res: Response): Promise<any> {
        try{
            // check if user has stylePreferenceId, if not, create a adefault preference
            if(!req.user.stylePreferenceId){
                console.log('No stylePreferenceId found for user, creating default preference.');

                // Create a default style pref
                const defaultStyle = await this.stylePreferenceService.createPreference({
                    userId: req.user.id,
                    bodyShape: 'hourglass', // You can define a default shape or set it dynamically
                    colorPreferences: ['black', 'white'], // Default color preferences
                    styleTypes: ['casual'],
                    occasionPreferences: ['everyday']  // Default style types
                });

                console.log('Created default style preference:', defaultStyle)
                
                //Generate a random UUID as the stylePreferenceId
                req.user.stylePreferenceId = uuidv4();
                await req.user.save(); //save the user with their new style preference

                console.log('Random stylePreferenceId assigned successfully: ', req.user.stylePreferenceId);

                return res.status(200).json({
                    success: true,
                    data: {
                        user: req.user,
                        StylePreferenceId: req.user.stylePreferenceId,
                    },
                    message: 'Random stylePreferenceId assigned successfully'
                });
            }

            //If stylePreferenceId exists, return the user profile
            console.log('Returning user profile with stylePreferenceId:', req.user.stylePreferenceId);
            return res.status(200).json({
                success: true,
                data: {
                    user: req.user,
                }
            });
        } catch (error: any) {
            console.error('Error fetching profile:', error.message);
            return res.status(400).json({
                    success: false,
                    message: 'Error fetching profile',
                    error: error.message,
                });
        }
    }
}