# 프로젝트 구조

- layouts: 페이지 레이아웃 템플릿 (header, footer, sidebar 등)을 관리
- auth: 인증/인가 관련 로직을 모듈화
- pages: 각 라우트에 해당하는 페이지 컴포넌트들을 구조화
- types: TypeScript 타입 정의들을 중앙 관리
- components: 재사용 가능한 컴포넌트들을 구조화
- assets: 정적 파일들을 관리
- styles: 전역 스타일들을 관리
- config: 프로젝트 설정 파일들을 관리
- api: 서버 API 호출 로직을 관리
- constants: 프로젝트 상수들을 관리
- contexts: React Context API를 사용하여 상태 관리를 구조화
- hooks: 재사용 가능한 훅들을 구조화
- utils: 재사용 가능한 유틸리티 함수들을 구조화

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
