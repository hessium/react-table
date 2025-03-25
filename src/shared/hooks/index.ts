import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { AppDispatch } from '../../store/store';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;