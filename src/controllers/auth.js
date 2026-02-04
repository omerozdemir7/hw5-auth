// ... importlar

export const loginUser = async (email, password) => {
  const user = await UsersCollection.findOne({ email });

 
 

 

  
  if (!user) {
    throw createHttpError(401, 'Email or password invalid'); // 404 yerine 401
  }
  

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Email or password invalid');
  }

 
};