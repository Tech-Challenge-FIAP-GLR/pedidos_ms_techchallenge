import mongoose from "mongoose";

mongoose.connect('mongodb://mongoapl:RyaHxxB5Fa@GNCASHDL05646:27017/treinamento-users?authMechanism=SCRAM-SHA-1&authSource=admin&tls=false')

mongoose.Promise = global.Promise;

export default mongoose;