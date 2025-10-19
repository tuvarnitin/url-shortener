import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { authenticateUser, createUser, findUserByEmail, findUserById } from "../dao/user.dao.js";

// Generate tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

// Set secure cookies
const setTokenCookies = (res, { accessToken, refreshToken }) => {
    // Set access token cookie
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
    });

    // Set refresh token cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await findUserByEmail(email);
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({ name, email, password: hashedPassword });

        // Generate tokens and set cookies
        const tokens = generateTokens(newUser._id);
        setTokenCookies(res, tokens);

        // Remove password from response
        const userResponse = { ...newUser._doc };
        delete userResponse.password;

        res.status(201).json({
            success: true,
            user: userResponse,
            message: "Registration successful"
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error, please try again later"
        });
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isAuthenticated = await authenticateUser(password, user.password);
        if (!isAuthenticated) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate tokens and set cookies
        const tokens = generateTokens(user._id);
        setTokenCookies(res, tokens);

        // Remove password from response
        const userResponse = { ...user._doc };
        delete userResponse.password;

        res.json({
            success: true,
            user: userResponse,
            message: "Login successful"
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error, please try again later"
        });
    }
}
export const getUser = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Access token not found"
            });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            const user = await findUserById(decoded.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            // Remove password from response
            const userResponse = { ...user._doc };
            delete userResponse.password;

            res.json({
                success: true,
                user: userResponse
            });
        } catch (tokenError) {
            // Token expired or invalid
            if (tokenError.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: "Token expired"
                });
            }
            throw tokenError;
        }
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error, please try again later"
        });
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token not found"
            });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const tokens = generateTokens(decoded.id);
            setTokenCookies(res, tokens);

            res.json({
                success: true,
                message: "Token refreshed successfully"
            });
        } catch (tokenError) {
            // Token expired or invalid
            if (tokenError.name === 'TokenExpiredError') {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                return res.status(401).json({
                    success: false,
                    message: "Refresh token expired, please login again"
                });
            }
            throw tokenError;
        }
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error, please try again later"
        });
    }
}

export const logout = async (req, res) => {
    try {
        // Clear cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error, please try again later"
        });
    }
}