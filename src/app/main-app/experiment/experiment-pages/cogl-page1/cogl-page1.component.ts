import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExperimentService } from 'src/app/services/experiment.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-cogl-page1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">

      <p class="!mt-4 !mb-10">Please carrefully read the text and answer the questions. The responses will be automatically submitted when the time is gone.</p>

      <!-- Text 1 -->
      <div *ngIf="actualTest == 1">
        <h1 class="text-2xl font-bold text-center text-blue-700 mb-6">
          The Mystery of Sleep: Why Do We Dream?
        </h1>
        <p class="text-lg leading-relaxed text-gray-800">
          Dreaming is a fascinating aspect of human life, but its purpose is still unknown. For centuries, scientists and 
          philosophers have speculated about the meaning and function of dreams. In ancient cultures, people viewed dreams as 
          messages from the gods or visions of the future. Modern science, however, focuses on the biological and psychological 
          processes behind dreams.
        </p>
        <p class="text-lg leading-relaxed text-gray-800 mt-4">
          Dreams typically occur during rapid eye movement (REM) sleep, a stage marked by intense brain activity. During this time, 
          the brain consolidates memories, processes emotions, and solves problems. Some researchers believe dreams result from these 
          processes, allowing the brain to rehearse scenarios or interpret random neural activity. The activation-synthesis theory, 
          for instance, suggests that dreams are the brain's attempt to make sense of random neural activity during sleep.
        </p>
        <p class="text-lg leading-relaxed text-gray-800 mt-4">
          Some psychologists suggest that dreams have a therapeutic role, helping individuals confront fears and regulate emotions. 
          For example, dreaming about stressful situations may help people cope with similar challenges in waking life. The threat 
          simulation hypothesis proposes that dreaming evolved as a mechanism to simulate threatening events, thereby enhancing an 
          individual's ability to face dangers in reality.
        </p>
        <p class="text-lg leading-relaxed text-gray-800 mt-4">
          Despite advances in neuroscience, many aspects remain unknown. Why do some people remember their dreams vividly while 
          others rarely recall them? What causes nightmares, and can we control them? These questions continue to drive scientific 
          inquiry and inspire various theories. Some researchers, like Allan Hobson, have proposed that dreams serve to maintain 
          brain function during sleep by providing necessary neural stimulation. Others, such as Mark Blagrove, have explored the 
          role of dreams in memory consolidation and problem-solving. As research progresses, our understanding of dreams and their 
          purposes continues to evolve, reflecting the complexity of the human mind.
        </p>
      </div>

      <!-- Text 2 -->
      <div *ngIf="actualTest == 2">
        <h1 class="text-2xl font-bold text-center text-blue-700 mb-6">
          The Enigmatic World of Quantum Mechanics
        </h1>
        <p class="text-lg leading-relaxed text-gray-800">
          Quantum mechanics, a fundamental theory in physics, describes the physical properties of nature at the scale 
          of atoms and subatomic particles. This branch of science emerged in the early 20th century, revolutionizing our 
          understanding of the microscopic world. Unlike classical physics, which deals with macroscopic objects we encounter daily, 
          quantum mechanics introduces concepts that are often counterintuitive and challenge our conventional perceptions.
        </p>
        <p class="text-lg leading-relaxed text-gray-800 mt-4">
          One of the core principles of quantum mechanics is wave-particle duality. This concept posits that every particle or quantum 
          entity can exhibit both wave-like and particle-like properties. For instance, electrons, traditionally considered particles, 
          can create interference patterns—a characteristic behavior of waves—when passed through a double-slit apparatus. 
          This duality is not confined to electrons; it applies universally to all quantum entities, including photons, the fundamental 
          particles of light.
        </p>
        <p class="text-lg leading-relaxed text-gray-800 mt-4">
          Another intriguing aspect is the principle of superposition. In the quantum realm, particles can exist in multiple states 
          simultaneously until observed or measured. This means a quantum system can be in a combination of all possible configurations, 
          a phenomenon vividly illustrated by the thought experiment known as Schrödinger's cat. In this scenario, a cat is placed in 
          a sealed box with a mechanism that has a 50% chance of killing it based on a random quantum event. Until the box is opened 
          and observed, the cat is considered both alive and dead simultaneously, exemplifying superposition.
        </p>
        <p class="text-lg leading-relaxed text-gray-800 mt-4">
          Quantum entanglement further defies classical intuition. When two particles become entangled, the state of one instantaneously 
          influences the state of the other, regardless of the distance separating them. Albert Einstein famously referred to this 
          phenomenon as "spooky action at a distance." Entanglement has profound implications for quantum computing and cryptography, 
          promising unprecedented processing power and secure communication channels.
        </p>
        <p class="text-lg leading-relaxed text-gray-800 mt-4">
          Despite its abstract nature, quantum mechanics has led to numerous technological advancements. Semiconductors, which are the 
          backbone of modern electronics, operate based on quantum principles. Additionally, technologies like magnetic resonance imaging 
          (MRI) in medicine and the development of lasers are direct applications of quantum mechanics. As research progresses, we 
          continue to uncover the vast potential of this enigmatic field, paving the way for innovations that could reshape our future.
        </p>
      </div>
    </div>

    <div class="text-center mt-20">
      <h1 class="text-2xl text-black">Questions</h1>

      <!-- Question 1 Text 1-->
      <div *ngIf="this.actualTest == 1" class="mt-6">
        <h2 class="text-xl">Single Choice Question:</h2>
        <p>1. During which sleep stage do dreams most commonly occur?</p>
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
      <!-- Question 1 Text 2-->
      <div *ngIf="this.actualTest == 2" class="mt-6">
        <h2 class="text-xl">Single Choice Question:</h2>
        <p>1. Which principle suggests that particles can exist in multiple states simultaneously until observed?</p>
        <form>
          <label>
            <input type="radio" name="principle" value="duality" (change)="updateResponse('q1', 'a. Wave-particle duality')">
            a. Wave-particle duality
          </label><br>
          <label>
            <input type="radio" name="principle" value="uncertainty" (change)="updateResponse('q1', 'b. Heisenberg s uncertainty principle')">
            b. Heisenberg's uncertainty principle
          </label><br>
          <label>
            <input type="radio" name="principle" value="superposition" (change)="updateResponse('q1', 'c. Superposition')">
            c. Superposition
          </label><br>
          <label>
            <input type="radio" name="principle" value="entanglement" (change)="updateResponse('q1', 'd. Quantum entanglement')">
            d. Quantum entanglement
          </label><br>
        </form>
      </div>

      <!-- Question 2 Text 1-->
      <div *ngIf="this.actualTest == 1" class="mt-6">
        <h2 class="text-xl">True/False Question:</h2>
        <p>2. Do dreams assist in memory consolidation and emotional processing?</p>
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
      <!-- Question 2 Text 2-->
      <div *ngIf="this.actualTest == 2" class="mt-6">
        <h2 class="text-xl">True/False Question:</h2>
        <p>2. Quantum entanglement implies that the state of one particle can instantly affect the state of another, regardless of distance.</p>
        <form>
          <label>
            <input type="radio" name="entanglement" value="true" (change)="updateResponse('q2', 'a. True')">
            a. True
          </label><br>
          <label>
            <input type="radio" name="entanglement" value="false" (change)="updateResponse('q2', 'b. False')">
            b. False
          </label><br>
        </form>
      </div>

      <!-- Question 3 Text 1-->
      <div *ngIf="this.actualTest == 1" class="mt-6">
        <h2 class="text-xl">Short Answer Question:</h2>
        <p>3. According to ancient cultures, what were dreams believed to represent?</p>
        <textarea class="p-4" rows="4" cols="50" placeholder="Your answer here..." (input)="updateResponseTextArea('q3', $event)"></textarea>
      </div>
      <!-- Question 3 Text 2-->
      <div *ngIf="this.actualTest == 2" class="mt-6">
        <h2 class="text-xl">Short Answer Question:</h2>
        <p>3. Name one technological advancement that has resulted from the principles of quantum mechanics.</p>
        <textarea class="p-4" rows="4" cols="50" placeholder="Your answer here..." (input)="updateResponseTextArea('q3', $event)"></textarea>
      </div>

      <!-- Question 4 Text 1-->
      <div *ngIf="this.actualTest == 1" class="mt-6">
        <h2 class="text-xl">Single Choice Question:</h2>
        <p>4. Which of the following is NOT a proposed function of dreams?</p>
        <form>
          <label>
            <input type="radio" name="dreams" value="memories" (change)="updateResponse('q4', 'a. Memory consolidation')">
            a. Memory consolidation
          </label><br>
          <label>
            <input type="radio" name="dreams" value="emotions" (change)="updateResponse('q4', 'b. Emotional regulation')">
            b. Emotional regulation
          </label><br>
          <label>
            <input type="radio" name="dreams" value="lottery" (change)="updateResponse('q4', 'c. Predicting lottery numbers')">
            c. Predicting lottery numbers
          </label><br>
          <label>
            <input type="radio" name="dreams" value="problem-solving" (change)="updateResponse('q4', 'd. Problem-solving')">
            d. Problem-solving
          </label><br>
        </form>
      </div>
      <!-- Question 4 Text 2-->
      <div *ngIf="this.actualTest == 2" class="mt-6">
        <h2 class="text-xl">Single Choice Question:</h2>
        <p>4. Which of the following is NOT a concept associated with quantum mechanics?</p>
        <form>
          <label>
            <input type="radio" name="concept" value="relativity" (change)="updateResponse('q4', 'a. Theory of relativity')">
            a. Theory of relativity
          </label><br>
          <label>
            <input type="radio" name="concept" value="superposition" (change)="updateResponse('q4', 'b. Superposition')">
            b. Superposition
          </label><br>
          <label>
            <input type="radio" name="concept" value="duality" (change)="updateResponse('q4', 'c. Wave-particle duality')">
            c. Wave-particle duality
          </label><br>
          <label>
            <input type="radio" name="concept" value="entanglement" (change)="updateResponse('q4', 'd. Quantum entanglement')">
            d. Quantum entanglement
          </label><br>
        </form>
      </div>

      <!-- Question 5 Text 1-->
      <div *ngIf="this.actualTest == 1" class="my-6">
        <h2 class="text-xl">Open-Ended Question:</h2>
        <p>5. What factors might influence an individual's ability to recall dreams vividly?</p>
        <textarea class="p-4" rows="4" cols="50" placeholder="Your answer here..." (input)="updateResponseTextArea('q5', $event)"></textarea>
      </div>
      <!-- Question 5 Text 2-->
      <div *ngIf="this.actualTest == 2" class="my-6">
        <h2 class="text-xl">Open-Ended Question:</h2>
        <p>5. In your opinion, how can the principles of quantum mechanics be applied to develop new technologies in the future?</p>
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

  private readonly sessionService = inject(SessionsService);
  private readonly experimentService = inject(ExperimentService);

  ///
  /// View Model
  ///

  private responses: Record<string, string> = {};
  private sessionId = '';

  protected actualTest = 1;

  ///
  /// Lifecycle Events
  ///

  public ngOnInit(): void {
    this.sessionService.getSessionRunning().subscribe((response) => {
      this.sessionId = response.id;
    });

    this.actualTest = Math.random() < 0.5 ? 1 : 2;
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
