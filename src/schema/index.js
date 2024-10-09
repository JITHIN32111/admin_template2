import * as Yup from 'yup';

export const signinInitialValues = {
    email: "",
    password: "",
};

export const signInSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address") // Ensures the input is a valid email format
        .required("Email is required"), // Custom error message if the field is empty
    password: Yup.string()
        .min(6, "Password must be at least 6 characters") // Ensures the password is at least 6 characters long
        .required("Please enter your password"), // Custom error message if the field is empty
});

export const AddMemberInitialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};
export const AddMemberSchema = Yup.object({
    name: Yup.string()
        .required("Username is required"), // Ensures the username is not empty

    email: Yup.string()
        .email("Invalid email address") // Ensures the email is in the correct format
        .required("Email is required"), // Ensures the email is not empty

    password: Yup.string()
        .min(6, "Password must be at least 6 characters") // Ensures the password is at least 6 characters long
        .required("Password is required"), // Ensures the password is not empty

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match") // Ensures the confirm password matches the password
        .required("Confirm Password is required"), // Ensures the confirm password is not empty
});

export const editMemberSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    earning: Yup.number().required("Earning is required"),
    joiningAmount: Yup.number().required("Joining Amount is required"),
    lastWallet: Yup.string().required("Select Current Wallet is required"),
    totalWallet: Yup.number().required("Total Wallet is required"),
    generationIncome: Yup.number().required("Generation Income is required"),
    sponsorshipIncome: Yup.number().required("Sponsorship Income is required"),
    overallIncome: Yup.number().required("Overall Income is required"),
    autoPoolAmount: Yup.number().required("Auto Pool Amount is required"),
    rank: Yup.string().required("Select Rank is required"),
    autoPool: Yup.boolean(),
  });


 export const editProfileSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("E-mail is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });



