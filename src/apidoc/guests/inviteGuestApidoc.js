/**
 *  @swagger
 *  /guests/invite/{meetup_id}/{user_id}:
 *    post:
 *      tags:
 *          - guests
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
 *          name: meetup_id
 *          required: true
 *          type: integer
 *          minimum: 1
 *          description: Meetup id.
 *        - in: path
 *          name: user_id
 *          required: true
 *          type: integer
 *          minimum: 1
 *          description: User id.
 *      description: Use to invite a new guest
 *      responses:
 *        '201':
 *          description: A new guest
 *          schema:
 *            type: object
 *            properties:
 *              meetup_id:
 *                type: integer
 *                example: 1
 *              user_id:
 *                type: integer
 *                example: 1
 *              checkin:
 *                type: boolean
 *                allowEmptyValue: true
 *                example: false
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
 *          description: Ivalid meetup id
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: meetup not found or User not found
 */