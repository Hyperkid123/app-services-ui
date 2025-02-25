import React from 'react';
import { useConfig } from '@rhoas/app-services-ui-shared';
import { DevelopmentPreview, FederatedModule } from '@app/components';
import { ServiceDownPage } from '@app/pages';
import { useModalControl, useQuota } from '@app/hooks';
import { AppServicesLoading } from '@rhoas/app-services-ui-components';
import { ProductType, QuotaContext } from '@rhoas/app-services-ui-shared';

export const ServiceRegistryPage: React.FunctionComponent = () => {
  const config = useConfig();

  if (config?.serviceDown) {
    return <ServiceDownPage />;
  }

  return <ServiceRegistryPageConnected />;
};

export const ServiceRegistryPageConnected: React.FC = () => {
  const config = useConfig();
  const { getQuota } = useQuota(ProductType.srs);
  const { preCreateInstance, shouldOpenCreateModal } = useModalControl();

  // Wait for the config and the registry to load
  if (config === undefined) {
    return <AppServicesLoading />;
  }

  return (
    <DevelopmentPreview>
      <FederatedModule
        scope="srs"
        module="./ServiceRegistry"
        fallback={<AppServicesLoading />}
        render={(ServiceRegistryFederated) => {
          return (
            <QuotaContext.Provider value={{ getQuota }}>
              <ServiceRegistryFederated
                preCreateInstance={preCreateInstance}
                shouldOpenCreateModal={shouldOpenCreateModal}
              />
            </QuotaContext.Provider>
          );
        }}
      />
    </DevelopmentPreview>
  );
};

export default ServiceRegistryPage;
