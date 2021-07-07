import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStoreProvider';
import IStorageProvider from './models/IStoreProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);