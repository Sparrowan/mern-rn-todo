import { Response, Request } from "express"
import { IUser } from "./../../types/user"
import User from "../../models/user"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userSchema } from "../../yup/userSchema";




const userRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "name" | "email" | "password">
        console.log(body)
        await userSchema.validate({
            body: body,
        });
        const salt = bcrypt.genSaltSync(10);
        const password_hash = bcrypt.hashSync(body.password, salt);
        const user: IUser = new User({
            name: body.name,
            email: body.email,
            password: password_hash,
        })

        await user.save()
        res
            .status(200)
            .json({ message: "Registration successful" })
    } catch (error) {
        res
            .status(500)
            .json({ error })
    }
}

const userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "email" | "password">
        const user = await User.findOne({ email: body.email });
        if (!user) {
            res
                .status(404)
                .json({ message: "User not found" })
            return

        }
        const isPasswordCorrect = await bcrypt.compare(
            body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            res
                .status(400)
                .json({ message: "Wrong Password!" })
            return
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT!
        );

        const { password, ...otherDetails } = user;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails } });
    } catch (error) {
        throw error
    }
}

const userLogout = async (req: Request, res: Response): Promise<void> => {

}

export { userRegister, userLogin, userLogout }