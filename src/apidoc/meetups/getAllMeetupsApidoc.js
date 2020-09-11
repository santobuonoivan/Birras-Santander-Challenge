/**
 *  @swagger
 *  /meetups:
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
 *      description: Use to request all meetups
 *      responses:
 *        '200':
 *          description: A meetups Array
 *          schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                meetup_id:
 *                  type: integer
 *                  example: 1
 *                name:
 *                  type: string
 *                  example: Beer day
 *                date:
 *                  type: string
 *                  example: 03/11/2020
 *                time:
 *                  type: string
 *                  example: '21:00'
 *                description:
 *                  type: string
 *                  example: Beer day
 *                city: 
 *                  type: string
 *                  example: ibiza
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