import { api } from "@/lib/axios"

export interface GetVoiceLanguageResponse {
  voiceCallLanguage: string | null
}

export interface UpdateVoiceLanguageResponse {
  voiceCallLanguage: string
}

export interface UpdateVoiceLanguageBody {
  language: string
}

export async function getVoiceLanguage(): Promise<GetVoiceLanguageResponse> {
  const { data } = await api.get<GetVoiceLanguageResponse>(
    "/bank-settings/voice-language"
  )
  return data
}

export async function updateVoiceLanguage(
  language: string
): Promise<UpdateVoiceLanguageResponse> {
  const body: UpdateVoiceLanguageBody = { language }
  const { data } = await api.patch<UpdateVoiceLanguageResponse>(
    "/bank-settings/voice-language",
    body
  )
  return data
}