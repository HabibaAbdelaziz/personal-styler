import { Request, Response } from 'express'; // These reperesnt the incoming HTTP requests and outgoing HTTP responses
import { UserService } from '../services/userService'; // handles creating a ndew user and other user related ops

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // Creating New Account for user
    async register(req: Request, res: Response) {
        try {
            const { email, password, firstName, lastName } = req.body;

            // Validat einput
            if (!email || !password || !firstName || !lastName){
                return res.status(400).json({
                    success: false,
                    message: 'All fields are required'
                });
            }

            // Create a user using user data (req.body) from the HTTP request
            const user = await this.userService.createUser(req.body);
            
            // 201 means "Created" so user was created successfully (request was successful)
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            // 400 means bad request and sends a json response back to client
            res.status(400).json({
                success: false,
                message: 'Registration failed',
                error: errorMessage
            });
        }
    }

    // User Logging in
    async login(req: Request, res: Response){
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
            res.status(200).json({
                success: true,
                message: 'Login Successful',
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                }
            });
        } catch (error: any) {
            res.status(401).json({
                success: false,
                message: 'Login failed',
                error: error.message
            });

        }
    }
}