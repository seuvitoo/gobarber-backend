import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import DiskStorageProvider from './implementations/DiskStoreProvider';
import S3StorageProvider from './implementations/S3StorageProvider';
import IStorageProvider from './models/IStoreProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
