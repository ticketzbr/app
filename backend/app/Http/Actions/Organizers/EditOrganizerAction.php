<?php

namespace HiEvents\Http\Actions\Organizers;

use HiEvents\DomainObjects\OrganizerDomainObject;
use HiEvents\Http\Actions\BaseAction;
use HiEvents\Http\Request\Organizer\UpsertOrganizerRequest;
use HiEvents\Http\ResponseCodes;
use HiEvents\Resources\Organizer\OrganizerResource;
use HiEvents\Services\Handlers\Organizer\DTO\EditOrganizerDTO;
use HiEvents\Services\Handlers\Organizer\EditOrganizerHandler;
use Illuminate\Http\JsonResponse;

class EditOrganizerAction extends BaseAction
{
    public function __construct(private readonly EditOrganizerHandler $editOrganizerHandler)
    {
    }

    public function __invoke(UpsertOrganizerRequest $request, int $organizerId): JsonResponse
    {
        $this->isActionAuthorized(
            entityId: $organizerId,
            entityType: OrganizerDomainObject::class,
        );

        $organizerData = array_merge(
            $request->validated(),
            [
                'id' => $organizerId,
                'account_id' => $this->getAuthenticatedUser()->getAccountId()
            ]
        );

        $organizer = $this->editOrganizerHandler->handle(
            organizerData: EditOrganizerDTO::fromArray($organizerData),
        );

        return $this->resourceResponse(
            resource: OrganizerResource::class,
            data: $organizer,
            statusCode: ResponseCodes::HTTP_CREATED,
        );
    }
}
