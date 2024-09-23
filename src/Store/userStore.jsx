import create from 'zustand';

const useUserStore = create((set) => ({
  userId: null,
  username: '',
  isAuth: false,

  login: (userId, username) => set({ userId, username, isAuth: true }),
  //logout: () => set({ userId: null, username: '', isAuth: false }),
}));

export default useUserStore;

//Это типа компонент для хранения чего-то, можно вызвать в любом компоненте проекта чтобы получить данные