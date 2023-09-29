export interface QuoteState {
  
  fromCity?: string;
  fromProvince?: string;
  fromCountry?: string;
  packageWeight?: number;
  packageUnit?: string;
  toCity?: string;
  toProvince?: string;
  toCountry?: string;
  insuranceAmount?: number;
  currency?: string;
  agreeTerms?: boolean;
  weight?: number;
  unit?: string;
}

export interface Quote{
  quotes: QuoteState,
  error: string,
  success: string
}
