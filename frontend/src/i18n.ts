import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: {
        title: 'Login',
        username: 'Username',
        password: 'Password',
        button: 'Login',
        loggingIn: 'Logging in...',
        success: 'Logged in successfully',
        failed: 'Login failed',
      },
      todoList: {
        title: 'Todo List',
        logout: 'Logout',
        placeholder: 'Enter a new todo',
        add: 'Add',
        adding: 'Adding...',
        complete: 'Complete',
        undo: 'Undo',
        delete: 'Delete',
        noTodos: 'No todos yet',
        loading: 'Loading...',
        addSuccess: 'Todo added successfully',
        toggleSuccess: 'Todo {{status}}',
        deleteSuccess: 'Todo deleted successfully',
        fetchError: 'Failed to fetch todos',
        addError: 'Failed to add todo',
        toggleError: 'Failed to update todo',
        deleteError: 'Failed to delete todo',
      },
    },
  },
  vi: {
    translation: {
      login: {
        title: 'Đăng nhập',
        username: 'Tên người dùng',
        password: 'Mật khẩu',
        button: 'Đăng nhập',
        loggingIn: 'Đang đăng nhập...',
        success: 'Đăng nhập thành công',
        failed: 'Đăng nhập thất bại',
      },
      todoList: {
        title: 'Danh sách công việc',
        logout: 'Đăng xuất',
        placeholder: 'Nhập công việc mới',
        add: 'Thêm',
        adding: 'Đang thêm...',
        complete: 'Hoàn thành',
        undo: 'Hoàn tác',
        delete: 'Xóa',
        noTodos: 'Chưa có công việc nào',
        loading: 'Đang tải...',
        addSuccess: 'Thêm công việc thành công',
        toggleSuccess: 'Công việc {{status}}',
        deleteSuccess: 'Xóa công việc thành công',
        fetchError: 'Không tải được danh sách công việc',
        addError: 'Không thêm được công việc',
        toggleError: 'Không cập nhật được công việc',
        deleteError: 'Không xóa được công việc',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;