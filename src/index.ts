import app from './app'
import connectToDatabase from './model/Connection';

const PORT = process.env.PORT || 3001;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Aplicação rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });