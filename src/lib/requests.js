const DOMAIN = 'localhost:3000';
const API_PREFIX = '/api/v1';
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;

function getJWT () {
  return localStorage.getItem('jwt');
}

// HTTP REQUESTS

const Maps = {
  all () {
    return fetch(
      `${BASE_URL}/posts`,
      {
        headers: {
          'Authorization': getJWT()
        }
      }
    )
      .then(res => res.json());
  }
}

const User = {
  create(params) {
    return fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: params })
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return { error: 'Could not create the user' };
      }
    });
  }
};

const Answer = {
  create (params) {
    return fetch(
      `${BASE_URL}/posts/${params.id}/answers`,
      {
        headers: {
          'Authorization': getJWT(),
          'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json())
  },
  delete (id) {
    return fetch(
      `${BASE_URL}/answers/${id}`,
      {
        headers: {
          'Authorization': getJWT(),
        },
        method: 'DELETE'
      }
    )
  }
}

const Post = {

  search (param1,param2) {
    return fetch(
      `${BASE_URL}/posts?utf8=✓&search1=${param1}&search2=${param2}`,
      {
        headers: {
          'Authorization': getJWT(),
        }
      }
    )
      .then(res => res.json())
  },

  all () {
    return fetch(
      `${BASE_URL}/posts`,
      {
        headers: {
          'Authorization': getJWT()
        }
      }
    )
      .then(res => res.json());
  },
  one (id) {
    return fetch(
      `${BASE_URL}/posts/${id}`,
      {
        headers: {
          'Authorization': getJWT()
        }
      }
    )
      .then(res => res.json());
  },
  create (params) {
    return fetch(
      `${BASE_URL}/posts`,
      {
        headers: {
          'Authorization': getJWT(),
          'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json())
  },
  delete (id) {
    return fetch(
      `${BASE_URL}/posts/${id}`,
      {
        headers: {
          'Authorization': getJWT(),
        },
        method: 'DELETE'
      }
    )
  }
}

const Token = {
  create (params) {
    return fetch(
      `${BASE_URL}/tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json());
  }
}

// export default Post;
// 👇 This named export. Unlike the default, it allows
// to export multiple variables which must import by their
// surround by braces.
// `import { Post, Token } from './lib/Post'`
export { Post, Token, Answer, Maps, User };
