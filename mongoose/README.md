# Mongoose with Hapi

This example illustrates how to use [mongoose](https://github.com/Automattic/mongoose) with [HapiJS](https://github.com/hapijs/hapi).

Before you run the package install all dependencies from `./mongoose` folder and start with:
```
node server.js
```

Because node modules are singletons, mongoose connection will persist across different models.
That also means you have to connect to database before starting server. It is achieved with `./database.js` file.

Once connected `mongoose` can be required from inside of models as any other plugin.

**Important**

Above only applies if there is no version conflict between packages, see [mongoose#2669](https://github.com/Automattic/mongoose/issues/2669).
If the case it is recommended to use [hapi-mongoose](https://github.com/asilluron/hapi-mongoose) plugin.