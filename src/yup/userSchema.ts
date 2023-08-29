import * as yup from 'yup'

const userSchema = yup.object({
    body: yup.object({
        name: yup.string().required("Name is Required"),
        email: yup.string().min(8).max(32).required(),
        password: yup.string().min(8).max(255).required("Password is required"),
    })
});
type personSchema = yup.InferType<typeof userSchema>
export { userSchema, personSchema }