import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ExperimentService } from 'src/app/services/experiment.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-cogl-page1',
  standalone: true,
  template: `
    <div class="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">

      <p class="!mt-4 !mb-10">Please carrefully read the text and answer the questions. The responses will be automatically submitted when the time is gone.</p>

      <h1 class="text-2xl font-bold text-center text-blue-700 mb-6">
        The Mystery of Sleep: Why Do We Dream?
      </h1>
      <p class="text-lg leading-relaxed text-gray-800">
        Dreaming is one of the most intriguing phenomena of human life, yet its purpose remains a mystery.
        For centuries, scientists and philosophers have speculated about the meaning and function of dreams.
        In ancient cultures, dreams were seen as messages from the gods or glimpses into the future. Modern
        science, however, has shifted the focus to the biological and psychological processes underlying dreams.
      </p>
      <p class="text-lg leading-relaxed text-gray-800 mt-4">
        Dreams typically occur during rapid eye movement (REM) sleep, a stage characterized by intense brain
        activity. During this time, the brain consolidates memories, processes emotions, and even solves problems.
        Some researchers believe that dreams are a byproduct of these processes, offering a way for the brain to
        rehearse scenarios or make sense of random neural activity.
      </p>
      <p class="text-lg leading-relaxed text-gray-800 mt-4">
        On the other hand, some psychologists propose that dreams have a therapeutic role, allowing individuals
        to confront fears and regulate emotional responses. For example, dreaming about stressful situations may
        help the dreamer cope with similar challenges in waking life. Despite advances in neuroscience, much
        remains unknown. Why do some people remember their dreams vividly while others rarely recall them? What
        causes nightmares, and can they be controlled? These questions continue to fuel scientific inquiry and
        inspire countless theories.
      </p>
    </div>

    <div class="text-center mt-20">
      <h1 class="text-2xl text-black">Questions</h1>

      <div class="mt-6">
        <h2 class="text-xl">Single Choice Question:</h2>
        <p>1. What is the primary stage of sleep associated with dreaming?</p>
        <form>
          <label>
            <input type="radio" name="sleep" value="non-REM" (change)="updateResponse('q1', 'a. Non-REM sleep')">
            a. Non-REM sleep
          </label><br>
          <label>
            <input type="radio" name="sleep" value="REM" (change)="updateResponse('q1', 'b. REM sleep')">
            b. REM sleep
          </label><br>
          <label>
            <input type="radio" name="sleep" value="light" (change)="updateResponse('q1', 'c. Light sleep')">
            c. Light sleep
          </label><br>
          <label>
            <input type="radio" name="sleep" value="deep" (change)="updateResponse('q1', 'd. Deep sleep')">
            d. Deep sleep
          </label><br>
        </form>
      </div>

      <div class="mt-6">
        <h2 class="text-xl">True/False Question:</h2>
        <p>2. Dreams are believed to help consolidate memories and process emotions.</p>
        <form>
          <label>
            <input type="radio" name="memory" value="true" (change)="updateResponse('q2', 'a. True')">
            a. True
          </label><br>
          <label>
            <input type="radio" name="memory" value="false" (change)="updateResponse('q2', 'b. False')">
            b. False
          </label><br>
        </form>
      </div>

      <div class="mt-6">
        <h2 class="text-xl">Short Answer Question:</h2>
        <p>3. Mention one ancient interpretation of dreams mentioned in the passage.</p>
        <textarea class="p-4" rows="4" cols="50" placeholder="Your answer here..." (input)="updateResponseTextArea('q3', $event)"></textarea>
      </div>

      <div class="mt-6">
        <h2 class="text-xl">Single Choice Question:</h2>
        <p>4. Which of the following is NOT a theory about the purpose of dreams?</p>
        <form>
          <label>
            <input type="radio" name="dreams" value="memories" (change)="updateResponse('q4', 'a. To consolidate memories')">
            a. To consolidate memories
          </label><br>
          <label>
            <input type="radio" name="dreams" value="emotions" (change)="updateResponse('q4', 'b. To regulate emotions')">
            b. To regulate emotions
          </label><br>
          <label>
            <input type="radio" name="dreams" value="lottery" (change)="updateResponse('q4', 'c. To predict lottery numbers')">
            c. To predict lottery numbers
          </label><br>
          <label>
            <input type="radio" name="dreams" value="problems" (change)="updateResponse('q4', 'd. To solve problems')">
            d. To solve problems
          </label><br>
        </form>
      </div>

      <div class="my-6">
        <h2 class="text-xl">Open-Ended Question:</h2>
        <p>5. In your opinion, why might some people recall dreams vividly while others do not?</p>
        <textarea class="p-4" rows="4" cols="50" placeholder="Your answer here..." (input)="updateResponseTextArea('q5', $event)"></textarea>
      </div>

    </div>
  `,
  styles: []
})
export class CoglPage1Component implements OnInit, OnDestroy {
  
  ///
  /// View Model
  ///

  private responses: Record<string, string> = {};
  private sessionId = '';

  private readonly sessionService = inject(SessionsService);
  private readonly experimentService = inject(ExperimentService);

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.sessionService.getSessionRunning().subscribe((response) => {
      this.sessionId = response.id;
    })
  }

  public ngOnDestroy(): void {
    Object.entries(this.responses).forEach(([questionId, response]) => {
      this.experimentService.saveExperimentResponse(this.sessionId, 'cogl1', questionId, response).subscribe({
        next: (response) => console.log(`Response for cogl1:${questionId} saved successfully: ${response}`),
        error: (err) => console.error(`Error saving response for cogl1:${questionId}:`, err)
      });
    });
  }

  ///
  /// UI Handlers
  ///

  protected updateResponse(questionId: string, answer: string) {
    this.responses[questionId] = answer;
  }

  protected updateResponseTextArea(questionId: string, event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const response = target.value;
    this.responses[questionId] = response;
  }

}
