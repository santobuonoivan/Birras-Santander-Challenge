/**
 *  @swagger
 *  /auth:
 *    post:
 *      tags:
 *          - login
 *      cosumes: 
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: The user to login.
 *          schema:
 *            type: object
 *            required:
 *              - userName
 *              - password
 *            properties:
 *              userName:
 *                type: string             
 *              password:
 *                type: string              
 *      description: Use to login a user
 *      responses:
 *        '200':
 *          description: A credentials user login
 *          schema:
 *            type: object
 *            properties:
 *              token:    
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibGVvbmVsQGxlb25lbC5jb20iLCJuYW1lIjoibGVvbmVsIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJtZWNhbHV4MiJ9LCJpYXQiOjE1OTk4MzgzNTYsImV4cCI6MTU5OTkyNDc1Nn0.6g5zz2DbEXm1kb0JpZNaVX5T9D0sBJygkSci-3SNUs0
 *        '400':
 *          description: Bad Credentials.
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Bad Credentials
 *        '404':
 *          description: Ivalid user id
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: user not found
 *        
 */