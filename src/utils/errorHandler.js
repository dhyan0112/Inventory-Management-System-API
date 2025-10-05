export const handleError = (res, error, status = 400) => {
  res.status(status).json({ message: error.message });
};