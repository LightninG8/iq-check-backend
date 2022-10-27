export interface IDatabaseService {
  connect: () => void;
  disconnect: () => void;
}
