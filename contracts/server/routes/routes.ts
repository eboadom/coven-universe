import {Request, Response, Router} from "express"
import {mockCowven, mockGrate, mockWizard} from "../mocks/mocks"

const router = Router()

export enum API_ROUTES {
  PING = "/ping",
  ALL_COWVENS_DATA = "/cowvens",
  COWVEN_DATA_BY_ID = "/cowven-by-id",
  ALL_GRATES_DATA = "/grates",
  GRATE_DATA_BY_ID = "/grate-by-id",
  ALL_WIZARDS_DATA_BY_OWNER = "/wizards-by-owner",
  WIZARD_DATA_BY_ID = "/wizard-by-id",
  ALL_PROPOSALS_COWVEN = "/proposals-cowven",
  PROPOSAL_BY_ID = "/proposal-by-id",
  GET_TX_VOTE_PROPOSAL_BY_ID = "/proposal-vote-by-id",
  GET_TX_CREATE_PROPOSAL = "/proposal-create",
  GET_TX_JOIN_COWVEN = "/cowven-join",
}

const resSuccessTemplate = (data: any) => ({
  status: "success",
  data: data,
})

router.post(API_ROUTES.ALL_COWVENS_DATA, (req: Request, res: Response) => {
  // TODO: unmock
  res.status(200).send(resSuccessTemplate([mockCowven, mockCowven, mockCowven]))
})

router.post(API_ROUTES.COWVEN_DATA_BY_ID, (req: Request, res: Response) => {
  // TODO: unmock
  res.status(200).send(resSuccessTemplate(mockCowven))
})

router.post(API_ROUTES.ALL_GRATES_DATA, (req: Request, res: Response) => {
  // TODO: unmock
  res
    .status(200)
    .send(resSuccessTemplate([mockGrate, mockGrate, mockGrate, mockGrate]))
})

router.post(API_ROUTES.GRATE_DATA_BY_ID, (req: Request, res: Response) => {
  // TODO: unmock
  res.status(200).send(resSuccessTemplate(mockGrate))
})

router.post(
  API_ROUTES.ALL_WIZARDS_DATA_BY_OWNER,
  (req: Request, res: Response) => {
    // TODO: unmock
    res
      .status(200)
      .send(resSuccessTemplate([mockWizard, mockWizard, mockWizard]))
  },
)

router.post(API_ROUTES.WIZARD_DATA_BY_ID, (req: Request, res: Response) => {
  // TODO: unmock
  res.status(200).send(resSuccessTemplate(mockWizard))
})

router.post(API_ROUTES.ALL_PROPOSALS_COWVEN, (req: Request, res: Response) => {
  // TODO: unmock
  res.status(200).send(resSuccessTemplate("TODO"))
})

router.post(API_ROUTES.PROPOSAL_BY_ID, (req: Request, res: Response) => {
  // TODO: unmock
  res.status(200).send(resSuccessTemplate("TODO"))
})

router.get(API_ROUTES.PING, (req: Request, res: Response) => {
  res.status(200).send("pong")
})

export default router
