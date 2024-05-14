import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = (app, port) => {
    mongoose
        .connect(process.env.MONGODB_CONNECTION_STRING)
        .then(() => {
            console.log('Database Connected');
            app.listen(port, () => {
                console.log(`Example app listening on port ${port}!`);
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export default connectDB;
