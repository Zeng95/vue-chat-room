// It's easy to update data in bulk with Firebase
// pass an array with the paths we want to update
const payload = {}

payload['messages/-L8HkVXx_jUWUXDIVDlR/nickname'] = 'elaine'
payload['messages/-L8HkXz1C1Xyr9r9WLdE/nickname'] = 'elaine'
payload['messages/-L8HkY9UXtLTRoGfnZr8/nickname'] = 'elaine'
payload['messages/-L8HkYMfiiEE0sQvBhJl/nickname'] = 'elaine'

database.ref().update(payload)