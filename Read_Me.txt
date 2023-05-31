First add a .env file inside of webshop-cms/webshop-cms with this information.

PORT = 7777
MONGO_URI = mongodb+srv://Admin:apa123@kyh.bunjgsh.mongodb.net/uppgift?retryWrites=true&w=majority
SECRET_KEY = QfZETvGk4p8zbDwaUn0XvQNBVDxFi8809XYwu1Qm

Secondly open a integrated terminal in webshop-cms/webshop-cms and run npm i.

Lastly run npm start that runs a concurrently script that has npm run dev and npm run server.