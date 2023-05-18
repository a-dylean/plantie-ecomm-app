import bcrypt from "bcrypt";

export const generateHash = async (password: string) => {
    // this is a good place to use a constant for the salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  
export const validatePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };
