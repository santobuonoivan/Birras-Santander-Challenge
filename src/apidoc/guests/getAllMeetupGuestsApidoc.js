/**
 *  @swagger
 *  /meetups/{meetup_id}:
 *    get:
 *      tags:
 *        - guests
 *      parameters:
 *        - name: token
 *          in: header
 *          schema:
 *              type: string
 *          example: eyJhbGciOkpXVCJ9.eyJ1c2VyIjp7I20iLCJuYW.XvUQU_Yd9v3d_JZUDFjs
 *          required: true
 *        - in: path
 *          name: meetup_id
 *          required: true
 *          type: integer
 *          minimum: 1
 *          description: Meetup id.       
 *      description: Use to request all invitations to a meetup.
 *      responses:
 *        '200':
 *          description: A meetup guests Array
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: integer
 *                  example: 1
 *                meetup_name:
 *                  type: string
 *                  example: Beer day
 *                name:
 *                  type: string
 *                  example: Pablo
 *                username:
 *                  type: string
 *                  example: mecalux
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
 *        '404':
 *          description: Ivalid meetup id
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: Meetup not found or haven't guests
 */