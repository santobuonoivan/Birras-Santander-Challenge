/**
 *  @swagger
 *  /users/{user_id}:
 *    put:
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
 *        - in: path
 *          name: user_id
 *          required: true
 *          type: integer
 *          minimum: 1
 *          description: User id.          
 *        - in: body
 *          name: user
 *          description: The user to update.
 *          schema:
 *            type: object            
 *            properties:
 *              userName:
 *                type: string
 *              name:
 *                type: string
 *              password:
 *                type: string
 *              email:
 *                type: string
 *      description: Use to update a user
 *      responses:
 *        '201':
 *          description: A update successful message
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: user update successful
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