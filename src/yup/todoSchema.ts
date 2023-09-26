import * as Yup from 'yup'

const todoCreateSchema = Yup.object({
    body: Yup.object({
        name: Yup.string().required("Name is Required"),
        description: Yup.string().required("Description is Required"),
    })
});

export { todoCreateSchema }