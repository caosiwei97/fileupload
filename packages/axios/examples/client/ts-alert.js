import axios from '../../'

axios.post(
  'http://localhost:3001/api/user',
  { a: 1 },
  {
    params: {
      a: 1,
    },
  },
)

axios({
  method: 'get',
})
