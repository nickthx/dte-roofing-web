import MultiStepLeadForm from './lead-form/MultiStepLeadForm';

interface ServiceLeadFormProps {
  defaultService?: string;
}

export default function ServiceLeadForm({ defaultService }: ServiceLeadFormProps) {
  return <MultiStepLeadForm formSource="service-sidebar" defaultService={defaultService} />;
}
