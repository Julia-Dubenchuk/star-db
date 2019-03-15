- Axios
- Superagent
- Got
- Request
- Reqwest

1. React ничего не знает о работе с сервером -
   это задача других библиотек

2. Сетевой код следует изолировать от кода
   компонентов

3. Если необходимо, трансформируйте данные до 
   того, как их получит компонент

4. Обрабатывайте состояния "загрузка" и "ошибка"

5. Разделяйте ответственность компонентов:
   логику и рендеринг

Этапы жизненного цикла:

MOUNTING
-------
constructor() => render() => componentDidMount()


UPDATES
------
New Props
                => render() => componentDidUpdate()
setState()


UNMOUNTING
------
componentWillUnmount()


ERROR
------
componentDidCatch()