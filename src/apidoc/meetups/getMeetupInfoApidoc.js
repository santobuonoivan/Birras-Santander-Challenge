/**
 *  @swagger
 *  /meetups/info/{meetup_id}:
 *    get:
 *      tags:
 *        - meetups
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
 *      description: Use to request one meetup info
 *      responses:
 *        '200':
 *          description: A meeting object with the temperature of the day
 *          schema:
 *            type: object
 *            properties:
 *              meetup_id:
 *                type: integer
 *                example: 1
 *              name:
 *                type: string
 *                example: Beer day
 *              date:
 *                type: string
 *                example: 03/11/2020
 *              time:
 *                type: string
 *                example: '21:00'
 *              description:
 *                type: string
 *                example: Beer day
 *              city: 
 *                type: string
 *                example: ibiza
 *              temp:
 *                type: number
 *                example: 25.6
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
 *          description: Meetup info not found
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: string
 *                example: the date of the meetup exceeds the future 5 days
 *        
 */