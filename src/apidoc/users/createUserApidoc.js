/**
 *  @swagger
 *  /users:
 *    post:
 *      tags:
 *          - users
 *      cosumes: 
 *        - application/json
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          schema:
 *            type: string
 *          example: eyJhbGciOkpXVCJ9.eyJ1c2VyIjp7I20iLCJuYW.XvUQU_Yd9v3d_JZUDFjs
 *        - in: body
 *          name: user
 *          description: The user to create.
 *          schema:
 *            type: object
 *            required:
 *              - userName
 *              - password
 *              - name
 *              - email
 *            properties:
 *              userName:
 *                type: string
 *              name:
 *                type: string
 *              password:
 *                type: string
 *              email:
 *                type: string
 *      description: Use to create a new users
 *      responses:
 *        '200':
 *          description: A new user
 *          schema:
 *            type: object
 *            properties:
 *              user_id:
 *                type: integer
 *                example: 1
 *              name:
 *                type: string
 *                example: Arthur Dent
 *              username:
 *                type: string
 *                example: mecalux
 *              email:
 *                type: string
 *                example: mecalux@example.com
 *        '400':
 *          description: Ivalid username
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: El username ya está siendo usado
 *        '401':
 *          description: Token expired
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: El token de seguridad expiró o Unauthorized access
 *        '403':
 *          description: Bad Credentials.
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Bad Credentials
 *        
 */