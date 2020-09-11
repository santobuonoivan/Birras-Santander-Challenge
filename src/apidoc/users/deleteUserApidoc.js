/**
 *  @swagger
 *  /users/{user_id}:
 *    delete:
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
 *      description: Use to delete a user
 *      responses:
 *        '200':
 *          description: A delete successful message
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: user delete successful
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