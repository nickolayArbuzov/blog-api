const quizQuestions = [
    {
        body: 'how are you?',
        correctAnswers: ['thanks, fine', 'it norm, how are you?']
    },
    {
        body: '2-how are you?',
        correctAnswers: ['2', 'thanks, fine', 'it norm, how are you?']
    },
    {
        body: '3-how are you?',
        correctAnswers: ['3', 'thanks, fine', 'it norm, how are you?']
    },
    {
        body: '4-how are you?',
        correctAnswers: ['4', 'thanks, fine', 'it norm, how are you?']
    },
    {
        body: '5-how are you?',
        correctAnswers: ['5', 'thanks, fine', 'it norm, how are you?']
    },
    {
        body: '6-how are you?',
        correctAnswers: ['6', 'thanks, fine', 'it norm, how are you?']
    },
]

const queryBlog = {
    pageNumber: '2',
    pageSize: '2', 
    sortBy: 'createdAt', 
    sortDirection: 'asc',
    searchNameTerm: 'gg',
}

const queryUser = {
    pageNumber: '1',
    pageSize: '2', 
    sortBy: 'createdAt', 
    sortDirection: 'asc',
    searchLoginTerm: '4',
    searchEmailTerm: '3',
}

let like = {
    likeStatus: 'Like'
}
let dislike = {
    likeStatus: 'Dislike'
}
let none = {
    likeStatus: 'None'
}

let ban = {
    isBanned: true,
    banReason: "stringstringstringst",
}
let unban = {
    isBanned: false,
    banReason: "stringstringstringst",
}

class Variables {

    query = {
        pageSize: 10,
        pageNumber: 1,
    }
    users = []
    createdUsers = [] 
    questionsIds = []
    accessTokens = []
    blogsIds = []
    postsIds = []
    commentsIds = []
    usersIds = []
    cookies = []
    devicesIds = []

    // cookies for one user in refresh-tokens case
    cookiePrev = ''
    cookieAfter = ''

    incorrectAnyUUID = 'b252c185-7777-4444-7777-8b6f242a2ff8'
    incorrectToken = '77777GciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzkyM2I5NTVlZTgwZDRkZGIyYzdlMjEiLCJkZXZpY2VJZCI6IjEwNzMxMjFjLTM1YWQtNGMyMi04ZTFhLWM2NTNmMzhkYmJmMyIsImlzc3VlZEF0IjoxNjcwNTI3ODkzMjg5LCJpYXQiOjE2NzA1Mjc4OTMsImV4cCI6MTY3MDUyODE5M30.53_vG0GlhTqXosc2sq2-TnzxEyItCLrDHw8ZJjWRSQc'

    setQuery(query: any){
        this.query = query
    }

    setUsers(user: {login: string, password: string, email: string}){
        this.users = [...this.users, user]
    }
    setCreatedUsers(createdUser: any){
        this.createdUsers = [...this.createdUsers, createdUser]
    }
    setQuestionsIds(questionId: string){
        this.questionsIds = [...this.questionsIds, questionId]
    }
    setAccessTokens(accessToken: string){
        this.accessTokens = [...this.accessTokens, accessToken]
    }
    setBlogsIds(blogId: string){
        this.blogsIds = [...this.blogsIds, blogId]
    }
    setPostsIds(postId: string){
        this.postsIds = [...this.postsIds, postId]
    }
    setCommentsIds(commentId: string){
        this.commentsIds = [...this.commentsIds, commentId]
    }
    setUsersIds(userId: string){
        this.usersIds = [...this.usersIds, userId]
    }
    setCookies(cookie: string){
        this.cookies = [...this.cookies, cookie]
    }
    setDevicesIds(deviceId: string){
        this.devicesIds = [...this.devicesIds, deviceId]
    }
    setCookiePrev(cookiePrev: string){
        this.cookiePrev = cookiePrev
    }
    setCookieAfter(cookieAfter: string){
        this.cookieAfter = cookieAfter
    }
}

const variables = new Variables()

export {
    quizQuestions,

    queryBlog, queryUser,

    like, dislike, none,

    ban, unban,

    variables,
}
