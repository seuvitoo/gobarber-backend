import { container } from 'tsyringe'


import IStoreProvider from './StoreProvider/models/IStoreProvider';
import DiskStoreProvider from './StoreProvider/implementations/DiskStoreProvider';

container.registerSingleton<IStoreProvider>('StoreProvider', DiskStoreProvider);