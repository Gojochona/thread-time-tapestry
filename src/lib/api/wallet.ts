// Stub wallet API — replace with real backend calls later.

export type SavedBank = {
  id: string;
  bank_name: string;
  bank_logo?: string;
  account_name: string;
  account_number: string;
};

export type SavedCard = {
  id: string;
  brand: string;
  last4: string;
};

export type BankOption = { code: string; name: string };

export type AddBankPayload = {
  bank_code: string;
  account_number: string;
  password: string;
};

export type TopUpCardPayload = {
  amount: number;
  card_number: string;
  expiry: string;
  cvv: string;
  save_card: boolean;
};

export type WithdrawPayload = {
  bank_id: string;
  amount: number;
  password: string;
};

export type SpendingItem = {
  order_id: string;
  order_name: string;
  spending: number;
  pending: number;
  released: number;
};

export type WalletTransaction = {
  transaction_id: string;
  amount: number;
  spending: number;
  pending: number;
  released: number;
  order_id?: string;
  order_name?: string;
  tailor_name?: string;
  order_status?: string;
  date: string;
};

export const formatNaira = (n: number) =>
  `${n < 0 ? "-" : ""}₦${Math.abs(n).toLocaleString("en-NG")}`;

// --- stubs ---
const wait = <T>(v: T, ms = 250) =>
  new Promise<T>((r) => setTimeout(() => r(v), ms));

export const getSavedBanks = () =>
  wait<SavedBank[]>([
    {
      id: "bnk_01",
      bank_name: "Wema Bank",
      account_name: "Seyi Adebayo",
      account_number: "8012345678",
    },
  ]);

export const getBankList = () =>
  wait<BankOption[]>([
    { code: "044", name: "Access Bank" },
    { code: "058", name: "GTBank" },
    { code: "057", name: "Zenith Bank" },
    { code: "035", name: "Wema Bank" },
    { code: "070", name: "Fidelity Bank" },
    { code: "033", name: "United Bank for Africa" },
  ]);

export const getSavedCards = () =>
  wait<SavedCard[]>([
    { id: "card_01", brand: "visa", last4: "4242" },
  ]);

export const addBank = (p: AddBankPayload) => wait({ ok: true, ...p });
export const withdraw = (p: WithdrawPayload) => wait({ ok: true, ...p });
export const topUpWithCard = (p: TopUpCardPayload) => wait({ ok: true, ...p });
export const topUpViaBankTransfer = (p: { amount: number }) => wait({ ok: true, ...p });

export const getSpendingSummary = () =>
  wait<SpendingItem[]>([
    {
      order_id: "A2841",
      order_name: "Aso Ebi · Owambe set",
      spending: 25_000,
      pending: 12_500,
      released: 12_500,
    },
    {
      order_id: "A2790",
      order_name: "Senator suit · Navy",
      spending: 48_000,
      pending: 0,
      released: 48_000,
    },
  ]);

export const getWalletTransaction = (id: string) =>
  wait<WalletTransaction>({
    transaction_id: id,
    amount: 25_000,
    spending: 25_000,
    pending: 12_500,
    released: 12_500,
    order_id: "A2841",
    order_name: "Aso Ebi · Owambe set",
    tailor_name: "Freddy Han",
    order_status: "in_progress",
    date: new Date().toISOString(),
  });
