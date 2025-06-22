declare module '*.module.css';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
declare type RootState = import('../src/app/store').RootState;
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
declare type AppDispatch = import('../src/app/store').AppDispatch;

declare type Uuid = string;

declare type IDEntity = {
  id: Uuid;
};

declare type InteractionActionPayload<T> = {
  data: T;
};

/** Для типизации генераторов в сагах */
declare type YieldResult<Fn> = Awaited<ReturnType<Fn>>;
