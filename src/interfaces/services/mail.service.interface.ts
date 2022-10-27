export interface IMailService {
  send: (email: string, resultId: string) => void;
  connect: () => void;
}
