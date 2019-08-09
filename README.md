## Quick start

    import { HandleAuth } from 'node-aws-authorize-websocket';

    export const authorize = HandleAuth({
        userPoolID: 'us-east-2_8G0QDqQi3',
        appClientID: '22vik2co81f7reethfbm8sfat5'
    });

## Serverless

    functions:
        connect:
            handler: handler/connect.main
            events:
                - websocket:
                    route: $connect 
                    authorizer: 
                    name: authConnect
                    identitySource:
                        - 'route.request.querystring.Auth'
        authConnect: 
            handler: handler/connect.authorize  
## Build 
`npm run build`
 
 Runs `babel src --out-dir lib`
