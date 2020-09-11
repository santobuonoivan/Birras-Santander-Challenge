/**
 *  @swagger
 *  /users:
 *    get:
 *      tags:
 *        - users
 *      parameters:
 *        - name: token
 *          in: header
 *          schema:
 *              type: string
 *          example: eyJhbGciOkpXVCJ9.eyJ1c2VyIjp7I20iLCJuYW.XvUQU_Yd9v3d_JZUDFjs
 *          required: true          
 *      description: Use to request all users
 *      responses:
 *        '200':
 *          description: A Users Array
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: integer
 *                  example: 1
 *                name:
 *                  type: string
 *                  example: Arthur Dent
 *                username:
 *                  type: string
 *                  example: mecalux
 *                email:
 *                  type: string
 *                  example: mecalux@example.com
 *        '401':
 *          description: Token expired
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: El token de seguridad expiró
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