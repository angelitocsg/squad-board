import { ISelectOptions } from "../../../../modules/core/components/SelectInput";
import { BehaviorEnum, ComponentEnum, StyleEnum } from "./NotificationTypes";

const vv_cp: ISelectOptions[] = [
  { label: "Banner", value: ComponentEnum.Banner },
  { label: "Modal", value: ComponentEnum.Modal },
];

const vv_t: { banner: ISelectOptions[]; modal: ISelectOptions[] } = {
  banner: [
    { label: "Novidade", value: StyleEnum.Info },
    { label: "Alerta", value: StyleEnum.Warning },
    { label: "Erro", value: StyleEnum.Error },
    { label: "Erro crítico", value: StyleEnum.Danger },
  ],
  modal: [
    { label: "Novidade", value: StyleEnum.Info },
    { label: "Financeiro", value: StyleEnum.Money },
    { label: "Erro", value: StyleEnum.Error },
    { label: "Texto (sem imagem)", value: StyleEnum.NoImage },
  ],
};

const vv_fx: ISelectOptions[] = [
  { label: "Exibir apenas uma vez", value: BehaviorEnum.UmaVez },
  { label: "Exibir uma vez por dia", value: BehaviorEnum.UmaVezDia },
];

const vv_mf: ISelectOptions[] = [
  { label: "MFE Chassi", value: "mf-corban-chassi" },
  { label: "MFE Configurações", value: "mf-corban-configuracoes" },
  { label: "MFE Embedamento IBConsig", value: "mf-corban-embed" },
  { label: "MFE FAQ", value: "mf-faq-ui" },
  { label: "MFE Gestão Propostas", value: "mf-corban-gestao-propostas" },
  { label: "MFE Relatórios", value: "mf-corban-relatorios" },
].map((x) => ({ label: `${x.label} (${x.value})`, value: x.value }));

export { vv_cp, vv_t, vv_fx, vv_mf };
