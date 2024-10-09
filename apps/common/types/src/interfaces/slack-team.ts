class Icon {
  image_102?: string;
  image_132?: string;
  image_230?: string;
  image_34?: string;
  image_44?: string;
  image_68?: string;
  image_88?: string;
  image_default?: boolean;
  image_original?: string;
}

export class SlackTeam {
  id: string;
  name?: string;
  url?: string;
  domain?: string;
  email_domain?: string;
  enterprise_domain?: string;
  enterprise_id?: string;
  enterprise_name?: string;
  avatar_base_url?: string;
  discoverable?: string;
  icon?: Icon;
  is_verified?: boolean;
  lob_sales_home_enabled?: boolean;
}
