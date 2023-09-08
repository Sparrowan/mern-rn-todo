import * as Yup from 'yup'

const userSchema = Yup.object({
    body: Yup.object({
        name: Yup.string().required("Name is Required"),
        email: Yup.string().email("Enter valid email").required("Email is Required"),
        password: Yup.string().required("Password is Required"),
    })
});
export { userSchema }