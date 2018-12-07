require('dotenv').config({
	path: require('path').resolve(__dirname, '/.env')
}); // eslint-disable-line global-require

export const NODE_ENV = process.env.NODE_ENV
	? process.env.NODE_ENV.toLowerCase()
	: 'development';
export const IS_DEV = NODE_ENV === 'development';
export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 9001;
export const JWT_SECRET =  process.env.JWT_SECRET || '2EGC+1mwpmHXEnvi6YH96ycsbVwZ4Zymwe63Buzc';
