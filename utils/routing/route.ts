const Route = {
    base: () => `/`,
    courses: {
        id: (username: string) => `/${username}`
    },
    lessons: {
        id: (username: string, lessonId: number) => `/${username}/lessons/${lessonId}`,
        homework: (username: string, lessonId: number) => `/${username}/lessons/${lessonId}/homework`
    },
    signIn: () => `sign-in`,
    signUp: () => `sign-up`,
    resetPassword: () => `reset-password`,
};

export default Route;